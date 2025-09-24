(function () {
  function el(html) {
    const t = document.createElement("template");
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
  function badgePill(text, type = "success") {
    return `<span class="badge text-bg-${type}">${text}</span>`;
  }

  window.UI = {
    renderHeroCampaign(container, data) {
      container.innerHTML = `
        <div class="card-hero p-4 rounded-xl h-100">
          <div class="h3 m-0 mb-3 text-uppercase barlow-condensed-bold">${data.month
        }</div>
          <hr class="mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="h6 mb-0">Seu progresso</div>
            <div class="fw-bold">${data.progress}xp</div>
          </div>
          ${progress(data.progress / data.goal)}
          <div class="mt-3 text-center">
            <span class="small">A meta de xp do mês é de <strong>${data.goal.toLocaleString(
          "pt-BR"
        )}xp</strong></span>
          </div>
        </div>`;
    },
    renderBadges(row, items) {
      row.innerHTML = items
        .map((b) => {
          const pct = Math.round((b.progress || 0) * 100);
          return `
          <div class="col-12 col-md-4 mb-3">
            <div class="card card-kpi" style="height: 250px; border-radius: 16px;">
              <div class="card-body d-flex align-items-center" style="gap: 16px; flex-direction: column; justify-content: space-around">
                <img src="${b.img}" alt="Badge" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
                <div> 
                <div style="text-align: center; margin-bottom: 0px" class="h6 mb-1">${b.title || 'Badge desbloqueado'}</div>
                  <div style="text-align: center; margin-top: 0px" class="h5 mb-1">${b.title2 || ''}</div> 
                </div>
                 
                  
                 ${
                !b.unlocked
                  ? ` 
                  
                    <div class="w-100 mt-2">
                    <div class="text-muted small mb-1">Falta ${100 - pct}% para este badge.</div>
                      <div class="progress" style="height: 6px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${pct}%;" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>`
                  : ''
              }

              </div>
            </div>
          </div>`;
        })
        .join("");
    },
    renderRecentSales(container, list) {
      container.innerHTML = list
        .map(
          (s) =>
            `<div class="col"><div class="card card-kpi"><div class="card-body"><div class="small text-muted">${s.date}</div><div class="fw-semibold">${s.title}</div><div class="text-success small mt-1">${s.xp}xp</div></div></div></div>`
        )
        .join("");
    },
    renderSalesTable(tbody, rows) {
      tbody.innerHTML = rows
        .map(
          (r) => `<tr>
        <td>${r.date}</td>
        <td class="truncate">${r.product}</td>
        <td class="text-center"><input class="form-check-input" type="checkbox" ${r.cross ? "checked" : ""
            } disabled></td>
        <td class="text-success">${r.xp}xp</td>
      </tr>`
        )
        .join("");
    },
    renderRules(row, rules) {
      row.innerHTML = rules
        .map(
          (r) =>
            `<div class="col"><div class="card card-kpi"><div class="card-body d-flex align-items-center gap-2">${badgePill(
              "Ativa",
              "success"
            )}<span class="fw-semibold">${r.title
            }</span><span class="ms-auto small text-muted">Até: ${r.due
            }</span></div></div></div>`
        )
        .join("");
    },
    renderRanking(tbody, items) {
      tbody.innerHTML = items
        .map(
          (i) =>
            `<tr><td>${i.code}</td><td>${i.name}</td><td>${i.points}</td><td>${i.sales}</td></tr>`
        )
        .join("");
    },
    renderRewards(container, list) {
      container.innerHTML = list
        .map((r) => {
          if (r.reached) {
            return `<div class="card card-kpi mb-3"><div class="card-body d-flex justify-content-between align-items-center"><div class="fw-bold">Desconto especial na loja</div><span class="badge text-bg-danger">Meta atingida</span></div></div>`;
          }
          return `<div class="card card-kpi mb-3"><div class="card-body"><div class="fw-bold mb-2">${r.title
            }</div>${progress(r.progress || 0)}</div></div>`;
        })
        .join("");
    },
  };
})();
