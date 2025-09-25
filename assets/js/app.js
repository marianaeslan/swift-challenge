document.addEventListener('DOMContentLoaded', function () {
  const page = document.body.dataset.page || '';
  if (page === 'colab-home') {
    UI.renderHeroCampaign(document.getElementById('heroCampaign'), Mock.campaign);
    UI.renderBadges(document.getElementById('badgesRow'), Mock.badges);
    UI.renderRewards(document.getElementById('rewards'), Mock.rewards);
    document.getElementById(
      'xpInfo'
    ).innerHTML = `XP do mês <span class="xp-red barlow-condensed-bold">${Mock.user.xpMonth}</span> | Total XP <span class="xp-red barlow-condensed-bold">${Mock.user.xpTotal}</span>`;
    document.getElementById('welcomeName').textContent = Mock.user.name;
  }
  if (page === 'colab-vendas') {
    UI.renderRecentSales(document.getElementById('recentSales'), Mock.salesRecent);
    UI.renderSalesTable(document.querySelector('#salesTable tbody'), Mock.salesTable);
  }

  // === add item na tabela com o modal ===

  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'modal-btn-submit') {
      e.preventDefault();

      const tbody = document.querySelector('#salesTable tbody');
      const inputProduct = document.getElementById('new-product-sale');
      const inputCross = document.getElementById('cross');
      const quantity = document.getElementById('quantity-sale');
      const price = document.getElementById('product-price');

      if (!inputProduct || !inputProduct.value.trim()) {
        alert('Por favor, insira o nome do produto.');
        return;
      }

      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      let totalXP = 0;

      if (quantity.value >= 3) {
        totalXP = Math.floor(Math.random() * (65 - 35 + 1) + 35);
      } else {
        totalXP = Math.floor(Math.random() * (34 - 10 + 1) + 10);
      }

      const newSale = {
        date: formattedDate,
        product: inputProduct.value.trim(),
        cross: inputCross.checked,
        xp: totalXP,
      };

      const newRecentSale = {
        date: formattedDate,
        title: inputProduct.value.trim(),
        xp: totalXP,
      };

      Mock.salesTable.push(newSale);
      Mock.salesRecent.push(newRecentSale);
      Mock.user.xpMonth += totalXP;
      Mock.user.xpTotal += totalXP;

      UI.renderSalesTable(tbody, Mock.salesTable);
      UI.renderRecentSales(document.getElementById('recentSales'), Mock.salesRecent.slice(-4));
      document.getElementById(
        'xpInfo'
      ).innerHTML = `XP do mês <span class="xp-red barlow-condensed-bold">${Mock.user.xpMonth}</span> | Total XP <span class="xp-red barlow-condensed-bold">${Mock.user.xpTotal}</span>`;

      quantity.value = 1;
      price.value = '0.00';
      inputProduct.value = '';
      inputCross.checked = false;

      const modal = bootstrap.Modal.getInstance(document.getElementById('modalVenda'));
      if (modal) {
        modal.hide();
      }
    }
  });

  if (page === 'gestor-home') {
    UI.renderRules(document.getElementById('rulesRow'), Mock.campaign.rules);
    UI.renderRanking(document.querySelector('#rankingTable tbody'), Mock.ranking);

    if (page === 'gestor-home') {
      UI.renderRules(document.getElementById('rulesRow'), Mock.campaign.rules);
      UI.renderRanking(document.querySelector('#rankingTable tbody'), Mock.ranking);

      // === Chart.js: linha da campanha ===
      const ctx = document.getElementById('campaignChart');
      if (ctx && window.Chart) {
        const labels = Array.from({ length: Mock.campaign.trend.length }, (_, i) => i + 1);
        new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                data: Mock.campaign.trend,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#D12E2E',
                borderWidth: 3,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                displayColors: false,
                callbacks: { title: (items) => `Dia ${items[0].label}` },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#6B7280', maxTicksLimit: 8 },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(209,46,46,.15)',
                  drawBorder: false,
                },
                ticks: { color: '#6B7280', maxTicksLimit: 6 },
              },
            },
            elements: { line: { capBezierPoints: true } },
          },
        });
      }
    }
  }
});
