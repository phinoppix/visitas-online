<script>
  import {Link} from 'svelte-routing';
  import {logOut} from '../auth/widget';
</script>

<header>
  <span>Visitas</span>
  <span class="spacer"></span>
  <nav>
    <ol>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/territories">Territories</Link></li>
      <li><Link to="/contacts">Contacts</Link></li>
    </ol>
  </nav>
  <button on:click={logOut}>signout</button>
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 72px;
    background-color: lightgray;
    padding: 0px 8px;
  }

  header > span.spacer {
    flex: 1;
  }

  ol {
    list-style: none;
    display: flex;
    flex-direction: row;
    padding: 0;
  }
  ol > li {
    padding: 12px;
    cursor: pointer;
  }
  ol > li:hover {
    color: #007bff;
  }
</style>