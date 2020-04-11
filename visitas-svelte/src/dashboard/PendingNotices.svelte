<script>
  export let notices = [];
  
  const getReadableFormat = notice => {
    if (notice.status === 'new')
      return `Verify newly added address by ${notice.user}`;
    else if(notice.status === 'completed')
      return `Territory marked as COMPLETE by ${notice.user}`;
    return 'unknown status';
  }
</script>

<section>
  <p>Pending notifications (24 items)</p>
  <ul>
    {#each notices as notice}
      <li>
        <div>{notice.date}</div>
        <div>{getReadableFormat(notice)}</div>
      </li>
    {/each}
  </ul>
  <p>(see more)</p>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    border: 2px solid gray;
    padding: 0px 6px;
  }
  section > p, ul {
    margin: 8px 0;
    padding: 0px;
  }
  li {
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: row;
  }
  li > div:nth-child(1) {
    width: 110px;
  }
</style>