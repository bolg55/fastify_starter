import { createLazyFileRoute } from '@tanstack/react-router';
import Home from '../Home';

export const Route = createLazyFileRoute('/')({
  component: Home,
});

// function Index() {
//   return (
//     <div className='p-2'>
//       <h3>Welcome Home!</h3>
//     </div>
//   );
// }
