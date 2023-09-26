'use client';

import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
interface Props {
    session: Session | null;
    user: User | null | undefined;}

type ErrorType = string | null;
type ProjectType = any;

export default function ProjectList({session, user}: Props){
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [projects, setProjects] = useState<ProjectType>(null);
    const [error, setError] = useState<ErrorType>(null);
    
    useEffect(() => {
        async function fetchProjects() {
          try {
            let { data: projects, error } = await supabase
              .from('projects')
              .select("*").eq('user', user?.id);
            
            if (error) {
              setError(error.message);
            } else {
              setProjects(projects);
              console.log(projects)
            }
          } catch (error: any) {
            setError(error.message);
          }
        }
        console.log(projects, "data displayed here")
        console.log(user?.id, "user id here")
        fetchProjects();
      }, []);

    return (<p>{projects}</p>)
}