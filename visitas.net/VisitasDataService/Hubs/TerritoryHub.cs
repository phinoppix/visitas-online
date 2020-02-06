using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace VisitasDataService.Hubs
{
    public class TerritoryHub : Hub
    {
        public async Task GetTerritory(string territoryId)
        {
            await Clients.All.SendAsync("GetTerritory received", territoryId);
        }
    }
}
