document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

document.getElementById("submit").addEventListener("click", submit, false);

console.log("Anna Namaste");

var name;
var email;
var semester;
var subjects;


const sem_1 = {
    "Basic Electrical Engineering": "https://drive.google.com/drive/folders/1Kw71In2qjQcBirw0CX-KYijCJVftmo1D?usp=sharing",
    "Chemistry": "https://drive.google.com/drive/folders/1OAsIsEQiRV_1QyCSK0xyaBEIL62a2hYi?usp=sharing",
    "Linear Algebra and Calculus": "https://drive.google.com/drive/folders/1T9ZuiW5VDPLNh1xmV65H1csYqQctvAea?usp=sharing",
    "Python Programming": "https://drive.google.com/drive/folders/19lgP7PAEsnxfPLN3vtI4BcpCItzXOCEP?usp=sharing",
}

const sem_2 = {
    "Applied Physics": "https://drive.google.com/drive/folders/1w_RWtedEJkfKVbrmLqWWxw16Y9Hs0mDr?usp=sharing",
    "C Programming": "https://drive.google.com/drive/folders/1KGIOKle0UEY2MpG0hL_uRIiuf9ndJyIQ?usp=sharing",
    "Essence of Indian Traditional Knowledge": "https://drive.google.com/drive/folders/1CLsW4jqJ7jYwFKRo6Vd1S_SalQ9wrecK?usp=sharing",
    "English": "https://drive.google.com/drive/folders/1lCgLCZjyMwrx2n19ZTwGGMqKivFySL86?usp=sharing",
    "Probability and Statistics": "https://drive.google.com/drive/folders/1xvI-9IlHnb06Egh1Hg1nCeVIovQJNyud?usp=sharing",
}

const sem_3 = {
    "Analog & Digital Electronics": "https://drive.google.com/drive/folders/1YjgNihMM9dOjEgsFsIUXkEIpfpabqmbF?usp=sharing",
    "Computer Organization and Architecture": "https://drive.google.com/drive/folders/1X3v2OCHlsF-ssEf1pXl_aRrlBFPSyrmE?usp=sharing",
    "Data Structures": "https://drive.google.com/drive/folders/10WkDtmwUqgnvqgxjUGschQ3PoVHepP0g?usp=sharing",
    "Discrete Mathematical Structures": "https://drive.google.com/drive/folders/1YPNE-BNzRvkoeOwjq38MIH_ejV1IiqJs?usp=sharing",
    "Java Programming": "https://drive.google.com/drive/folders/1GWHRvQ4W-UoICZsE3s2o5JdZ46LSl7RH?usp=sharing",
    "Operating Systems": "https://drive.google.com/drive/folders/1tRS3YgAZfDhBKYjF-UbcVpQezIQRZD3l?usp=sharing",
}

const sem_4 = {
    "Business Economics and Financial Analysis": "",
    "Design and Analysis of Algorihtms": "",
    "Database Management Systems": "",
    "Operating Systems": "https://drive.google.com/drive/folders/16PVWMEYCQassfaPBjgsrupRkY5eb46P3?usp=sharing",
    "Theory Of Computation": "",
    "Indian Tradition": "https://docs.google.com/document/d/1Lg0xneDyLRoM0wYeVDW0P2K7E6Ip90WL_EVEQqCr8ZI/view"
}

const sem_5 = {

}

const sem_6 = {

}

function sub_sem() {
    semester = document.querySelector('#semester').value;
    let html = "";
    for (let i = 0; i<Object.keys(eval(semester)).length;i++) {
        line = `<option value="${Object.keys(eval(semester))[i]}">${Object.keys(eval(semester))[i]}</option>`;
        html += line;
    };
    //console.log(html);
    document.getElementById('subjects').innerHTML = html;

}

function validate_mail(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail) && (email.includes("@iare.ac.in"))) {
        return true;
    } else {
        return false;
    }
};

function submit() {
    name = document.querySelector('#name').value;
    email = document.querySelector('#email').value;
    semester = document.querySelector('#semester').value;

    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('semester', semester);

    var selected = [];
    for (var option of document.getElementById('subjects').options) {
        if (option.selected) {
            selected.push(option.value);
        }
    };
    for (i=0;i<6;i++) {
        selected.push('');
    }


    if (selected[0]=='' || name=='' || email=="" || semester=="") {
        return alert("Missing Field. Please fill all the details!");
    };

    if (document.getElementById("agree").checked == false) {
        return alert("Please confirm by marking the checkbox!");
    };
    
    if (validate_mail(email)!== true) {
        return alert("Incorrect Mail Address. Please use Domain Mail Address only.")
    };

    console.log(name);
    console.log(email);
    console.log(semester);
    console.log(selected);

    var total = '';
    for (i=0;i<selected.length;i++) {
        if (selected[i] != '') {
            if (i == 0) {
                total = total + selected[i];
            }
            else {
                total = total + ', ' + selected[i];
            }
            
        }
    }
    
    make_pdf(name, subjects, selected, semester, sem_1, sem_2, sem_3, sem_4, sem_5, sem_6);
    const options = {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: `<b>🗃️ New Request Served</b>\n\nName: ${name}\n\nEmail Address: ${email}\n\nSubjects Chosen: \n${total}`,
            parse_mode: 'html',
            chat_id: '-1001683760687'
        })
    };

    fetch('https://api.telegram.org/bot5488586515%3AAAGJRKKp7FWjOpEmgkHcGSNX2bdqMiOOvGI/sendMessage', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    
}


