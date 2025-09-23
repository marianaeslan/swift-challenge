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
  }
});
