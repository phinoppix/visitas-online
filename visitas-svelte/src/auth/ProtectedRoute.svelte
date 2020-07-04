<script>
  import Authorized from './Authorized.svelte';
  import {Route} from 'svelte-routing';
</script>
<Route {...$$restProps}>
  <Authorized>
    <slot></slot>
  </Authorized>
</Route>

