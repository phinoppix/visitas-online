<script>
  import {Route} from 'svelte-routing';
  import {ContactEditor} from './contactEditor';
  import {ContactHome} from './contactHome';
</script>

<Route path="/contacts/add" component={ContactEditor}/>
<Route path="/contacts/edit/:id" let:params>
  <ContactEditor edit_id={params.id}/>
</Route>
<Route path="/contacts" component={ContactHome}/>