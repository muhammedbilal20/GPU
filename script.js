const gpuInputs = document.getElementById("gpuInputs");
const addGPU = document.getElementById("addGPU");
const generateChart = document.getElementById("generateChart");
const chartTable = document.querySelector("#chartTable tbody");
const chartHeader = document.getElementById("chartHeader");
const chartTitle = document.getElementById("chartTitle");
const headerColor = document.getElementById("headerColor");
const downloadPNG = document.getElementById("downloadPNG");

// Add new row
addGPU.addEventListener("click", () => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input type="text" class="gpuName" placeholder="RTX 5070">
        </td>

        <td>
            <input type="number" class="gpuPercent" placeholder="75">
        </td>

        <td>
            <button class="deleteBtn">X</button>
        </td>
    `;

    gpuInputs.appendChild(row);

});

// Delete row
gpuInputs.addEventListener("click", e=>{

    if(e.target.classList.contains("deleteBtn")){
        e.target.closest("tr").remove();
    }

});

// Live header color
headerColor.addEventListener("input",()=>{

    chartHeader.style.background = headerColor.value;

});

// Generate chart
generateChart.addEventListener("click",()=>{

    chartHeader.innerText = chartTitle.value;

    chartTable.innerHTML="";

    const names=document.querySelectorAll(".gpuName");
    const percents=document.querySelectorAll(".gpuPercent");

    let data=[];

    for(let i=0;i<names.length;i++){

        if(names[i].value!=="" && percents[i].value!==""){

            data.push({
                name:names[i].value,
                percent:Number(percents[i].value)
            });

        }

    }

    // Sort highest first
    data.sort((a,b)=>b.percent-a.percent);

    data.forEach(gpu=>{

        const row=document.createElement("tr");

        row.innerHTML=`
            <td>${gpu.percent}%</td>
            <td>${gpu.name}</td>
        `;

        chartTable.appendChild(row);

    });

});

// Download PNG
downloadPNG.addEventListener("click",()=>{

    html2canvas(document.querySelector("#chart"),{

        backgroundColor:"#ffffff",
        scale:3

    }).then(canvas=>{

        const link=document.createElement("a");

        link.download="gpu-relative-performance.png";

        link.href=canvas.toDataURL();

        link.click();

    });

});
