<script>
  import {Router, Route} from 'svelte-routing';

  import {initApolloClient} from './graphqlConfig';
  import Header from './design-system/Header.svelte';
  import TerritoryRoutes from './territory/TerritoryRoutes.svelte';
  import ContactRoutes from './contact/ContactRoutes.svelte';
  import DashboardRoutes from './dashboard/DashboardRoutes.svelte';

  import {Login, authClient} from './auth';
  import {authorized} from './store';

  initApolloClient();

  authClient.tokenManager.get(token => {
    authorized.update(_ => !!token);
  });
</script>

<Router url="">
  <Header/>
  <Route path="/login" component={Login}/>

  <TerritoryRoutes/>
  <!--  <ContactRoutes/>-->
  <DashboardRoutes/>
</Router>