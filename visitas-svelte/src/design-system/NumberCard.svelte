<script>
  export let value;
  export let name;
</script>

<div>
  <h1>{value}</h1>
  <span>{name}</span>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    text-align: center;
    max-width: 90px;
  }
  div > h3 {
    font-size: 22px;
    font-weight: bold;
  }
  div > span {
    font-size: 12px;
  }
</style>