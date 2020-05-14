<script>
  import ApolloClient from 'apollo-boost';
  import {setClient} from 'svelte-apollo';
  import {Router, Route} from 'svelte-routing';
  import mapbox from 'mapbox-gl';

  import Header from './design-system/Header.svelte';
  import Dashboard from './dashboard/Dashboard.svelte';
  import TerritoriesHome from './territory/TerritoriesHome.svelte';
  import TerritoryEditor from './territory/TerritoryEditor.svelte';
  import Authorized from './Authorized.svelte';
  import ContactHome from './contact/ContactHome.svelte';
  import {ContactEditor} from './contact/contactEditor';
  import {appEnv} from './envConfig';

  mapbox.accessToken = appEnv.mapAccessToken;
  const service = new ApolloClient({uri: appEnv.apiEndpoint});
  setClient(service);
</script>

<Router url="">
  <Header/>
  <Authorized>
    <Route path="/territories/add" component={TerritoryEditor}/>
    <Route path="/territories/edit/:id" let:params>
      <TerritoryEditor edit_id={params.id}/>
    </Route>
    <Route path="/territories" component={TerritoriesHome}/>
    <Route path="/contacts/add" component={ContactEditor} />
    <Route path="/contacts/edit/:id" let:params>
      <ContactEditor edit_id={params.id}/>
    </Route>
    <Route path="/contacts" component={ContactHome} />

    <Route path="/" component="{Dashboard}"/>
  </Authorized>
</Router>