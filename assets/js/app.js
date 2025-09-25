document.addEventListener("DOMContentLoaded", function () {
  const page = document.body.dataset.page || "";
  if (page === "colab-home") {
    UI.renderHeroCampaign(
      document.getElementById("heroCampaign"),
      Mock.campaign
    );
    UI.renderBadges(document.getElementById("badgesRow"), Mock.badges);
    UI.renderRewards(document.getElementById("rewards"), Mock.rewards);
    document.getElementById(
      "xpInfo"
    ).innerHTML = `XP do mês <span class="xp-red barlow-condensed-bold">${Mock.user.xpMonth}</span> | Total XP <span class="xp-red barlow-condensed-bold">${Mock.user.xpTotal}</span>`;
    document.getElementById("welcomeName").textContent = Mock.user.name;
  }
  if (page === "colab-vendas") {
    UI.renderRecentSales(
      document.getElementById("recentSales"),
      Mock.salesRecent
    );
    UI.renderSalesTable(
      document.querySelector("#salesTable tbody"),
      Mock.salesTable
    );
    document.getElementById(
      "xpStats"
    ).innerHTML = `XP do mês <span class="xp-red barlow-condensed-bold">${Mock.user.xpMonth}</span> | Total XP <span class="xp-red barlow-condensed-bold">${Mock.user.xpTotal}</span>`;
  }
  if (page === "gestor-home") {
    UI.renderRules(document.getElementById("rulesRow"), Mock.campaign.rules);
    UI.renderRanking(
      document.querySelector("#rankingTable tbody"),
      Mock.ranking
    );
    
  if(page === 'gestor-home'){
    UI.renderRules(document.getElementById('rulesRow'), Mock.campaign.rules);
    UI.renderRanking(document.querySelector('#rankingTable tbody'), Mock.ranking);

    // === Chart.js: linha da campanha ===
    const ctx = document.getElementById('campaignChart');
    if (ctx && window.Chart) {
      const labels = Array.from({length: Mock.campaign.trend.length}, (_,i)=> i+1);
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data: Mock.campaign.trend,
            borderColor: getComputedStyle(document.documentElement)
                          .getPropertyValue('--brand').trim() || '#D12E2E',
            borderWidth: 3,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              displayColors: false,
              callbacks: { title: (items)=> `Dia ${items[0].label}` }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#6B7280', maxTicksLimit: 8 }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(209,46,46,.15)',
                drawBorder: false
              },
              ticks: { color: '#6B7280', maxTicksLimit: 6 }
            }
          },
          elements: { line: { capBezierPoints: true } }
        }
      });
      }
    }
  }
});
