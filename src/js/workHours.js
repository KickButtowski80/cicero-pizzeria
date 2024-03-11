document.addEventListener("DOMContentLoaded", function() {
    let d = new Date();
    let dayInNumber = d.getDay();
    let workHours = document.getElementById("work-hours");
    
 
    let workSchedule = [
      "Sunday 11AM–10PM",
      "Monday 11AM–10PM",
      "Tuesday 11AM–10PM",
      "Wednesday 11AM–10PM",
      "Thursday 11AM–10PM",
      "Friday 11AM–11PM",
      "Saturday 11AM–11PM"
    ];
    
 
    // let selectList = document.createElement("select");
    // selectList.id = "mySelect";
    // selectList.name = "mySelect";
    // selectList.className = 'text-black';
    let selectList = document.getElementById('hours-dropdown')
    // selectList.style.width = "100%"
    // workHours.appendChild(selectList);
    
 
    for (var i = dayInNumber; i < workSchedule.length; i++) {
        let option = document.createElement("option");
        option.value = workSchedule[i];
        option.text = workSchedule[i];
        selectList.appendChild(option);
    }
  
    for (var i = 0 ; i < dayInNumber; i++) {
        let  option = document.createElement("option");
        option.value = workSchedule[i];
        option.text = workSchedule[i];
        selectList.appendChild(option);
    }
  });
  