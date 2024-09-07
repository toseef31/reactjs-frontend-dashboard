import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
  backLink?: string;
  createLink?: string;
}
const Breadcrumb = ({ pageName, backLink = '', createLink = '' }: BreadcrumbProps) => {
  return (
    <>
    {createLink && <Link to={createLink} className='mb-6 text-white p-2 px-3 bg-primary rounded-md'>Create</Link>}
    <div className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${createLink && 'mt-4'}`}>
      <h2 className="flex items-center text-title-md2 font-semibold text-black dark:text-white">
        {backLink && <Link to={backLink} className='mr-2 text-primary bg-white dark:bg-gray-200 p-1 rounded-md'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </Link>}
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
    </>
  );
};

export default Breadcrumb;
