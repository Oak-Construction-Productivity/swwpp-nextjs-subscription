'use client';
import { getSession, getSubscription, getActiveProductsWithPrices } from '@/app/supabase-server';
import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import ProjectButton from '../Common/ProjectButton';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal
} from 'react';

//import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
interface Props {
  session: Session | null;
  user: User | null | undefined;
  projectNumber: number | undefined;
}

type ErrorType = string | null;
type ProjectType = any;

export default function ProjectList({ session, user, projectNumber }: Props) {
  const supabaseUrl = 'https://eggvjyydqfibdrgfyyny.supabase.co';
  const supabaseKey: string | undefined =
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set in the environment variables.'
    );
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [error, setError] = useState<ErrorType>(null);
  const basePath = '/slug/';
  const [projectCount, setProjectCount] = useState<ProjectType>();
  const [projectLimitBoolen, setProjectLimitBoolean] = useState<ProjectType>(true);
  //setProjectCount(number);


  useEffect(() => {
    async function fetchProjects() {
      try {
        let { data: projects, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user', user?.id);

        if (error) {
          setError(error.message);
        } else {
          setProjects(projects || []);
          setProjectCount(projects?.length)
          console.log(projects, "project count:")
          if(projects?.length && projects.length >= projectNumber){
            setProjectLimitBoolean(false);
            console.log("set to false")
          }
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
    console.log(projects.length, 'data displayed here');
    console.log(user?.id, 'user id here');
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col h-60vh">
      {projects.slice(0, projectNumber).map((project: any, index: Key | null | undefined) => (
        <Link key={index} href={`${'projects/'}${project.id}`}>
          <div className="flex flex-col p-4 mb-4">
            <div className="border-2 border-gray-700 bg-gradient-to-b from-gray-200 to-gray-100 rounded-lg shadow-md p-4">
              <p className="font-sans text-lg font-semibold text-gray-800">
                {project.project_id}
              </p>
              <p className="font-sans text-base text-gray-600">
                {project.project_description}, {project.project_name},
                Reporting: {project.frequency}
              </p>
              <p className="font-sans text-sm text-gray-500">
                {project.project_address}, {project.project_town},{' '}
                {project.project_zip_code}, {project.active},{' '}
                {project.lattitude}, {project.longitude}
              </p>
            </div>
          </div>
        </Link>
      ))}
        <ProjectButton
          redirectTo="projects/add"
          color="bg-gradient-to-r from-yellow-500 via-red-600 to-pink-500"
          size="150"
          click={projectLimitBoolen}
          className="custom-class"
        /> 
    </div>
  );
}

{
  /*<p>{projects?.[0].project_address}</p>*/
}
