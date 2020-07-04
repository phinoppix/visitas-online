<script>
  import {ProtectedRoute} from '../auth';
  import Dashboard from './Dashboard.svelte';
</script>

<ProtectedRoute path="/">
  <Dashboard />
</ProtectedRoute>