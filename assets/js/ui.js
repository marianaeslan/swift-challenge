(function () {
  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function progress(pct) {
    return `<div class="progress">
              <div class="progress-bar" role="progressbar" 
                   style="width:${pct * 100}%" 
                   aria-valuenow="${pct * 100}" 
                   aria-valuemin="0" 
                   aria-valuemax="100">
              </div>
            </div>`;
  }
  function badgePill(text, type = 'success') {
    return `<span class="badge text-bg-${type}">${text}</span>`;
  }

  window.UI = {
    renderHeroCampaign(container, data) {
      container.innerHTML = `
        <div class="card-hero p-4 rounded-xl h-100">
          <div class="h3 m-0 mb-1 text-uppercase barlow-condensed-bold ">${data.month}</div>
          <hr class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="h6 mb-0">Seu progresso</div>
            <div class="fw-bold">${data.progress}xp</div>
          </div>
          <div class="progress mb-2">
            <div class="progress-bar" role="progressbar"
                style="width:${(data.progress / data.goal) * 100}%"
                aria-valuenow="${(data.progress / data.goal) * 100}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="small">A meta de xp do mês é de <strong>${data.goal.toLocaleString('pt-BR')}xp</strong></div>
        </div>`;
    },
    renderBadges(row, items) {
      row.innerHTML = items
        .map((b) => {
          const pct = Math.round((b.progress || 0) * 100);
          return `
          <div class="col-12 col-md-4 mb-3">
            <div class="card card-kpi p-2" style="height: 100%; border-radius: 16px;">
              <div class="card-body d-flex align-items-center" style="gap: 16px; flex-direction: column; justify-content: space-between">
                <img src="${
                  b.img
                }" alt="Badge" style="width: 80px; height: 74px; border-radius: 50%; object-fit: cover;">
                <div>
                 ${
                   b.unlocked
                     ? ` 
                  <div style="text-align: center; margin-bottom: 0px;" class="h4 mb-1 barlow-condensed-medium">${
                    b.title || 'Badge desbloqueado 🎉'
                  }</div>
                    <div>
                    
                    </div>`
                     : `<div style="text-align: center; margin-bottom: 0px" class="h6 mb-1 barlow-condensed-medium">${
                         b.title || 'Badge desbloqueado 🎉'
                       }</div>`
                 }
                
               
                  <div style="text-align: center; margin-top: 0px" class="h5 mb-1 barlow-condensed-medium">${
                    b.title2 || ''
                  }</div> 
                </div>
                   ${
                     b.unlocked
                       ? ` 
                  
                    <div>
                    
                    </div>`
                       : ''
                   }
                 ${
                   !b.unlocked
                     ? ` 
                  
                    <div class="w-100 mt-2">
                    <div class="text-muted small mb-1">Falta ${100 - pct}% para este badge.</div>
                      <div class="progress" style="height: 6px;">
                        <div class="progress-bar" role="progressbar" style="width: ${pct}%;" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>`
                     : ''
                 }

              </div>
            </div>
          </div>`;
        })
        .join('');
    },
    renderRecentSales(container, list) {
      container.innerHTML = list
        .map(
          (s) =>
            `<div class="col-12 col-lg-3 d-flex flex-column">
                <div class="card red-border rounded-xl px-3 flex-grow-1">
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="small text-muted">${s.date}</div>
                      <div class="small mt-1 nunito-bold" style="color: var(--progress);">${s.xp}xp</div>
                    </div>
                    <div class="fw-semibold">${s.title}</div>
                  </div>
                </div>
              </div>`
        )
        .join('');
    },
    renderSalesTable(tbody, rows) {
      tbody.innerHTML = rows
        .map(
          (r) => `
          <tr>
            <td>${r.date}</td>
            <td class="truncate">${r.product}</td>
            <td class="text-center"><input class="form-check-input" type="checkbox" ${
              r.cross ? 'checked' : ''
            } disabled></td>
            <td class="nunito-bold" style="color: var(--progress);">${r.xp}xp</td>
          </tr>`
        )
        .join('');
    },
    renderRules(row, rules) {
      row.innerHTML = rules
        .map(
          (r) => `
        <div class="col-12 col-md-4">
          <article class="proto-desafio-card">
            <span class="proto-desafio-badge">Desafio</span>
            <h3 class="proto-desafio-title">${r.title}</h3>
            <p class="proto-desafio-date">Data final: ${r.due}</p>
          </article>
        </div>
      `
        )
        .join('');
    },
    renderRanking(tbody, items) {
      tbody.parentElement.classList.add('table-collab');
      tbody.innerHTML = items
        .map(
          (i) => `
        <tr>
          <td class="fw-semibold">${i.code}</td>
          <td>${i.name}</td>
          <td class="fw-semibold">${i.points}</td>
          <td>${i.sales}</td>
        </tr>
      `
        )
        .join('');
    },
    renderRewards(container, list) {
      container.innerHTML = list
        .map((r) => {
          if (r.reached) {
            return `
            <div class="red-border mb-3 mt-2 rounded-xl p-4">
              <div class="card-body card-reached d-flex justify-content-between align-items-center">
                <div class="barlow-condensed-bold text-uppercase p-reached">
                  Desconto especial na loja
                </div>
                  <span class="badge p-2 text-bg-danger">Meta atingida</span>
                </div>
            </div>`;
          }
          return `
          <div class="card card-kpi mb-3 mt-2 p-2 rounded-xl bg-red-brand text">
            <div class="card-body">
              <div class="fw-bold mb-2 d-flex justify-content-between align-items-center p-unreached">
                <div class="nunito-regular">${r.title}</div>
                <div class="nunito-regular">${r.progress * 100}%</div>
              </div>
            ${progress(r.progress || 0)}</div>
          </div>`;
        })
        .join('');
    },
  };
})();
