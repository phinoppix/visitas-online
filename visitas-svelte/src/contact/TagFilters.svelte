<script>
  import {createEventDispatcher} from 'svelte';

  import {TagButton} from '../design-system';
  import {removeElement} from '../util';

  export let tags = [];

  const supportedTags = ['confirmed', 'do not visit', 'Iloko', 'Tagalog', 'invalid', 'not home'];

  const toggleTag = tag => {
  	tags = removeElement(tags, tag);
  }
</script>

<div class="tag-filters-box">
    {#each supportedTags as tag}
      <TagButton activeClass={tags.indexOf(tag) > -1 ? 'active': ''}
                 on:click={() => toggleTag(tag)}>
          {tag}
      </TagButton>
    {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  a {
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    border: 1px solid black;
  }

  a:hover {
    text-decoration: none;
  }

  :global(.active) {
    background-color: cornflowerblue !important;
    color: white;
  }
</style>