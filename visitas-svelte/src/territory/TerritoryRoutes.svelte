<script>
  import TerritoryEditor from './TerritoryEditor.svelte';
  import TerritoriesHome from './TerritoriesHome.svelte';
  import {ProtectedRoute} from '../auth';
</script>

<ProtectedRoute path="/territories">
  <TerritoriesHome/>
</ProtectedRoute>
<ProtectedRoute path="/territories/edit/:id" let:params>
    <TerritoryEditor edit_id={params.id}/>
</ProtectedRoute>
