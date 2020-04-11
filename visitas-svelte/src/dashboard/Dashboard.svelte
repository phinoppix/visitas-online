<script>
  import { Link } from "svelte-routing";

  import NumberCard from '../design-system/NumberCard.svelte';
  import FrameBox from '../design-system/FrameBox.svelte';
  import PendingNotices from './PendingNotices.svelte';
  import TerritoryList from '../territory/TerritoryList.svelte';
  import * as TerritoryCols from '../territory/enums.js';

  const dummyNotices = [
    {date: '2019-06-10', status: 'new', user: 'Aris'},
    {date: '2019-06-10', status: 'new', user: 'Kevin'},
    {date: '2019-06-10', status: 'completed', user: 'Camille'}
  ];
  const statistics = {
    totalTerritories: 101,
    totalCheckedOut: 35,
    totalCheckout6monthsOrLonger: 14,
    totalAddresses: "2.5k",
    totalAddressesUnconfirmed: "1.2k"
  };

  const visibleColumns = TerritoryCols.TERRITORY_TABLE_ALLCOLUMNS ^
    TerritoryCols.TERRITORY_TABLE_CHECKEDOUTBY ^
    TerritoryCols.TERRITORY_TABLE_EDITOR;

  const territories = [
    {
      code: 'Sandalwood - Missisauga - NW1',
      countContacts: 73,
      checkedOut1: '2019-June (3mos)',
      checkedOut2: '2019-Feb (4mos)',
      checkedOut3: '2018-May',
      checkedOutBy: 'Ellen'
    }
  ];
</script>
 
<main>
  <section class="sec-1">
    <PendingNotices notices={dummyNotices} />
    <div class="numbers">
      <NumberCard value={statistics.totalTerritories} name="Number of territories" />
      <NumberCard value={statistics.totalCheckedOut} name="Checked out" />
      <NumberCard value={statistics.totalCheckout6monthsOrLonger} name="Worked on 6 months or longer" />
      <NumberCard value={statistics.totalAddresses} name="Number of addresses" />
      <NumberCard value={statistics.totalAddressesUnconfirmed} name="Unconfirmed" />
    </div>
  </section>

  <FrameBox title="Territories"> 
    <TerritoryList {visibleColumns} {territories} />
    <p><Link to="/territories">(see more)</Link></p>
  </FrameBox>

  <FrameBox title="Campaign"> 
    List of campaigns
  </FrameBox>
</main>

<style>
  main {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 16px 16px 32px 16px;
  }
  .numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .sec-1 {
    display: flex;
    flex-direction: row;
  }
</style>