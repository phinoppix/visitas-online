<script>
  import {onMount} from 'svelte';
  import { navigate } from "svelte-routing";

  import {signinWidget} from './widget';
  import {asyncGetAuthToken} from './widget';

  onMount(async () => {
    const token = await asyncGetAuthToken();
    if (token) navigate('/');

    signinWidget.renderEl({
      el: '#login-container'
    }, res => {
      if (res.status === 'SUCCESS') {
      	signinWidget.authClient.tokenManager.add('id_token', res.tokens.idToken);
        signinWidget.authClient.tokenManager.add('access_token', res.tokens.accessToken);

        navigate('/', {replace: true});
      }
    });

    return () => {
      signinWidget.remove();
    }
  });
</script>
<div id="login-container">
</div>