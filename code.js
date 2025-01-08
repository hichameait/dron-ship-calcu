fetch("packs.json")
  .then((res) => res.json())
  .then((data) => {
    const packs = document.getElementById("packs");
    for (let [key, value] of Object.entries(data.tarifs.standard.distance)) {
      let options = document.createElement("option");
      options.value = key;
      options.textContent = key;
      packs.appendChild(options);
    }
  });

async function calculater(poid, lon, lan, hau, value, type) {
  try {
    const res = await fetch("packs.json");
    const data = await res.json();
    const tarifs = data.tarifs[type];
    const distance = tarifs.distance[value];
    const base = tarifs.base;
    const dimension = tarifs.dimension;
    const poids = tarifs.poids;

    return base + (poid, poids) + (lan + lon + hau) * dimension + distance;
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("btn").addEventListener("click", async () => {
  const poid = parseFloat(document.getElementById("poid").value);
  const lon = parseFloat(document.getElementById("longueur").value);
  const lan = parseFloat(document.getElementById("largeur").value);
  const hau = parseFloat(document.getElementById("hauteur").value);
  const value = String(document.getElementById("packs").value);

  const results_st = await calculater(poid, lon, lan, hau, value, "standard");
  const results_ex = await calculater(poid, lon, lan, hau, value, "express");

  document.getElementById("rez1").innerHTML = results_st;
  document.getElementById("rez2").innerHTML = results_ex;
});
