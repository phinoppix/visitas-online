<script>
  import {ProtectedRoute} from '../auth';
  import {ContactEditor} from './contactEditor';
  import {ContactHome} from './contactHome';
</script>

<ProtectedRoute path="/contacts/add">
  <ContactEditor />
</ProtectedRoute>
<ProtectedRoute path="/contacts/edit/:id" let:params>
  <ContactEditor edit_id={params.id}/>
</ProtectedRoute>
<ProtectedRoute path="/contacts">
  <ContactHome />
</ProtectedRoute>