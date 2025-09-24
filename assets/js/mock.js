
// Minimal mock data to render UI (front-only)
window.Mock = {
  user: { name: "Ana", xpMonth: 980, xpTotal: 10236 },
  campaign: {
    month: "Maio",
    goal: 2000,
    progress: 980,
    rules: [
      { title: "Realizar 10 vendas com cross-sell", due: "31/05/2025", badge: "success" },
      { title: "NPS maior que 9 por duas semanas", due: "31/05/2025", badge: "success" },
      { title: "Manter ticket médio acima da meta por duas semanas", due: "31/05/2025", badge: "success" }
    ]
  },
  salesRecent: [
    { date: "02/05/2025", title: "Alcatra 1kg, Farofa, Molho de Pimenta", xp: 15 },
    { date: "02/05/2025", title: "Coca-cola 2L", xp: 10 },
    { date: "03/05/2025", title: "Pack Heineken, Picanha, Coxa de frango", xp: 45 }
  ],
  salesTable: [
    { date:"02/05/2025", product:"Alcatra 1kg, Farofa, Molho de Pimenta", cross:true, xp:15 },
    { date:"02/05/2025", product:"Coca-cola 2L", cross:false, xp:10 },
    { date:"03/05/2025", product:"Pack Heineken", cross:true, xp:15 },
    { date:"03/05/2025", product:"Bife de Patinho 2kg", cross:false, xp:40 }
  ],
  ranking: [
    { code:"03775", name:"Heloísa Lima", points:980, sales:28 },
    { code:"09123", name:"Bruna Carvalho", points:700, sales:24 },
    { code:"08543", name:"Fernando Santos", points:670, sales:23 },
    { code:"07562", name:"Rafaela Monteiro", points:550, sales:18 },
    { code:"01111", name:"Claudio Rios", points:210, sales:7 }
  ],
  badges:[
    { title:"Badge desbloqueado", unlocked:true, progress: 1, img: "assets/images/badge-money.svg", title2: "" },
    { title:"Próxima badge:", progress:0.75, img: "assets/images/badge-horse.svg", title2: "MELHOR NPS" },
    { title:"Próxima badge:", progress:0.2,img: "assets/images/badge-target.svg", title2: "MAIOR PONTUAÇÃO DO MÊS"}
  ],
  rewards:[
    { title:"Desconto especial na loja", reached:true },
    { title:"Vale Compras", progress:0.25 },
    { title:"Bônus Salarial", progress:0.0 },
    { title:"Dia de Folga", progress:0.0 }
  ]
};
