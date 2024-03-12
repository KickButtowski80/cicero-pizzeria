document.addEventListener("DOMContentLoaded", function() {
    const  d = new Date();
    const  dayInNumber = d.getDay();
     
    const  workSchedule = [
      "Sunday 11AM–10PM",
      "Monday 11AM–10PM",
      "Tuesday 11AM–10PM",
      "Wednesday 11AM–10PM",
      "Thursday 11AM–10PM",
      "Friday 11AM–11PM",
      "Saturday 11AM–11PM"
    ];
    
 
 
    const  selectList = document.getElementById('hours-dropdown')
 
    
 
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
  