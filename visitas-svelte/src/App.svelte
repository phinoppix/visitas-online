<script>
  import {Router, Route} from 'svelte-routing';

  import {initApolloClient} from './graphqlConfig';
  import Header from './design-system/Header.svelte';
  import TerritoryRoutes from './territory/TerritoryRoutes.svelte';
  import {ContactRoutes} from './contact';
  import DashboardRoutes from './dashboard/DashboardRoutes.svelte';

  import {Login, asyncUpdateAuthState} from './auth';

  initApolloClient();

  asyncUpdateAuthState();
</script>

<Router url="">
  <Header/>
  <Route path="/login" component={Login}/>

  <TerritoryRoutes/>
  <ContactRoutes/>
  <DashboardRoutes/>
</Router>