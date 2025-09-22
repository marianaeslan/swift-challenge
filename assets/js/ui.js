
(function(){
  function el(html){const t=document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild;}
  function progress(pct, cls=''){ return `<div class="progress ${cls}"><div class="progress-bar" role="progressbar" style="width:${pct*100}%" aria-valuenow="${pct*100}" aria-valuemin="0" aria-valuemax="100"></div></div>`}
  function badgePill(text, type='success'){ return `<span class="badge text-bg-${type}">${text}</span>`}

  window.UI = {
    renderHeroCampaign(container, data){
      container.innerHTML = `
        <div class="card-hero p-4 rounded-xl">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="h5 m-0">Campanha do mês</div>
            <button class="kebab text-white" aria-label="Opções"><i class="bi bi-gear"></i></button>
          </div>
          <div class="small opacity-75 mb-1">${data.month}</div>
          <div class="mb-2">Seu progresso</div>
          ${progress(data.progress / data.goal, 'bg-white')}
          <div class="d-flex justify-content-between small mt-2">
            <span>${data.progress}xp</span>
            <span>Meta: ${data.goal.toLocaleString('pt-BR')}xp</span>
          </div>
        </div>`;
    },
    renderBadges(row, items){
      row.innerHTML = items.map((b)=>{
        if(b.unlocked){
          return `<div class="col-12 col-md-4"><div class="card card-kpi"><div class="card-body"><div class="h6 mb-2">Badge desbloqueado</div><div class="text-muted">Parabéns! 🎉</div></div></div></div>`
        } else {
          const pct = Math.round((b.progress||0)*100);
          return `<div class="col-12 col-md-4"><div class="card card-kpi"><div class="card-body"><div class="h6 mb-2">${b.title}</div>${progress(b.progress||0)}<div class="small text-muted mt-2">Faltam ${100-pct}% para este badge</div></div></div></div>`
        }
      }).join('');
    },
    renderRecentSales(container, list){
      container.innerHTML = list.map(s=>`<div class="col"><div class="card card-kpi"><div class="card-body"><div class="small text-muted">${s.date}</div><div class="fw-semibold">${s.title}</div><div class="text-success small mt-1">${s.xp}xp</div></div></div></div>`).join('');
    },
    renderSalesTable(tbody, rows){
      tbody.innerHTML = rows.map(r=>`<tr>
        <td>${r.date}</td>
        <td class="truncate">${r.product}</td>
        <td class="text-center"><input class="form-check-input" type="checkbox" ${r.cross?'checked':''} disabled></td>
        <td class="text-success">${r.xp}xp</td>
      </tr>`).join('');
    },
    renderRules(row, rules){
      row.innerHTML = rules.map(r=>`<div class="col"><div class="card card-kpi"><div class="card-body d-flex align-items-center gap-2">${badgePill('Ativa','success')}<span class="fw-semibold">${r.title}</span><span class="ms-auto small text-muted">Até: ${r.due}</span></div></div></div>`).join('');
    },
    renderRanking(tbody, items){
      tbody.innerHTML = items.map(i=>`<tr><td>${i.code}</td><td>${i.name}</td><td>${i.points}</td><td>${i.sales}</td></tr>`).join('');
    },
    renderRewards(container, list){
      container.innerHTML = list.map((r)=>{
        if(r.reached){ 
          return `<div class="card card-kpi mb-3"><div class="card-body d-flex justify-content-between align-items-center"><div class="fw-bold">Desconto especial na loja</div><span class="badge text-bg-danger">Meta atingida</span></div></div>`
        }
        return `<div class="card card-kpi mb-3"><div class="card-body"><div class="fw-bold mb-2">${r.title}</div>${progress(r.progress||0)}</div></div>`
      }).join('');
    }
  }
})();
