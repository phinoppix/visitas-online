<script>
  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';
  import { Router, Route } from "svelte-routing";

  import Header from "./design-system/Header.svelte";
  import Dashboard from "./dashboard/Dashboard.svelte";
  import TerritoriesHome from "./territory/TerritoriesHome.svelte";
  import TerritoryEditor from './territory/editor/TerritoryEditor.svelte';

  const service = new ApolloClient({ uri: 'http://localhost:4001' });
  setClient(service);
</script>

<Header />
<Router url="">
  <Route path="/territories/add" component="{TerritoryEditor}" />
  <Route path="/territories" component="{TerritoriesHome}" />
  <Route path="/" component="{Dashboard}" />
</Router>