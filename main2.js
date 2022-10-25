

const tableBodyElement = document.querySelector('#tbodySinhVien');
let currentCountSV = localStorage.getItem('msvCount') ? JSON.parse(localStorage.getItem('msvCount')) : 1;;
const INPUT_TYPE = {
    TEXT: 'text',
    SELECT: 'select',
    NUMBER: 'number'
};
const listSVInfo = localStorage.getItem('listSV') ? JSON.parse(localStorage.getItem('listSV')) : [];
    const inputMSV = document.querySelector('#txtMaSV');
    const inputPW = document.querySelector('#txtPass');
    const inputName = document.querySelector('#txtTenSV');
    const inputEmail = document.querySelector('#txtEmail');
    const inputDOB = document.querySelector('#txtNgaySinh');
    const inputCourse = document.querySelector('#khSV');
    const inputMath = document.querySelector('#txtDiemToan');
    const inputPhysic = document.querySelector('#txtDiemLy');
    const inputChemistry = document.querySelector('#txtDiemHoa');
    let editID='';

function buildSVTemplate(svOject) {

    const templateSV = document.querySelector('#templateSV');
    const fragmentSV = templateSV.content.cloneNode(true);
    const svElement = fragmentSV.querySelector('.SVrow');
    const removeBtn = svElement.querySelector('.removeBtn');
    removeBtn.addEventListener('click', () => {
        // tim element tren html dua tren id
        tableBodyElement.removeChild(svElement)
        // tim vi tri cua phan tu
        const svIndex = listSVInfo.findIndex((sv) => {
            return sv.ID === svOject.ID;
        })
        if (svIndex !== -1) {
            listSVInfo.splice(svIndex, 1);
            localStorage.setItem('listSV', JSON.stringify(listSVInfo));
        }
    });

    const editBtn=svElement.querySelector('.editBtn');
    editBtn.addEventListener('click',()=>{
        inputName.value=svOject.Name;
        inputEmail.value=svOject.Email;
        inputDOB.value=svOject.DOB;
        inputCourse.value=svOject.Course;
        inputMath.value=svOject.Math;
        inputChemistry.value=svOject.Chemistry;
        inputPhysic.value=svOject.Physics;
        editID=svOject.ID;
        addSvBtn.innerText='Edit sinh vien';
        
    })

    const msvElement = svElement.querySelector('.msv');
    msvElement.innerText = svOject.ID;

    const tensvElement = svElement.querySelector('.tensv');
    tensvElement.innerText = svOject.Name;

    const emailElement = svElement.querySelector('.email');
    emailElement.innerText = svOject.Email;

    const dobElement = svElement.querySelector('.dob');
    dobElement.innerText = svOject.DOB;

    const coursename = svOject.Course == '1' ? 'KH001' : 'KH002';

    const courseElement = svElement.querySelector('.course');
    courseElement.innerText = coursename;

    const DTB = (svOject.Math + svOject.Physics + svOject.Chemistry) / 3;

    const dtbElement = svElement.querySelector('.dtb');

    dtbElement.innerText = DTB.toFixed(1);
    return svElement;



};

for (const SVInfo of listSVInfo) {

    const sinhvien = buildSVTemplate(SVInfo);
    tableBodyElement.appendChild(sinhvien);


}
const addSvBtn = document.querySelector('.addSvBtn');
addSvBtn.addEventListener('click', handleAddBtn);
function handleAddBtn(event) {
    event.preventDefault();
    // const inputMSV = document.querySelector('#txtMaSV');
    // const inputPW = document.querySelector('#txtPass');
    // const inputName = document.querySelector('#txtTenSV');
    // const inputEmail = document.querySelector('#txtEmail');
    // const inputDOB = document.querySelector('#txtNgaySinh');
    // const inputCourse = document.querySelector('#khSV');
    // const inputMath = document.querySelector('#txtDiemToan');
    // const inputPhysic = document.querySelector('#txtDiemLy');
    // const inputChemistry = document.querySelector('#txtDiemHoa');
    // check dk

    let isValid = true;
    const arrayInput = [inputPW, inputMSV, inputName, inputEmail, inputCourse, inputMath, inputPhysic, inputChemistry];
    for (const input of arrayInput) {
        const inputType = input.getAttribute('data-type');
        const inputName = input.getAttribute('dataname');

        if (inputType === INPUT_TYPE.TEXT) {
            if (!input.value || input.value.length < 5) {

                input.nextElementSibling.style.display = 'block';
                input.nextElementSibling.innerText = `${inputName} is not valid`;
                isValid = false;
            }
        }
    }
    if (!isValid)
        return;

        //check is edit
        if(editID){
            const editElement=listSVInfo.find((sv)=>{
                return sv.ID===editID;
            });
            editElement.Name=inputName.value;
            editElement.Email=inputEmail.value;
            editElement.Course=inputCourse.value;
            editElement.Math=inputMath.value;
            editElement.Chemistry=inputChemistry.value;
            editElement.Physics=inputPhysic.value;
            tableBodyElement.innerHTML='';

            for (const SVInfo of listSVInfo) {

                const sinhvien = buildSVTemplate(SVInfo);
                tableBodyElement.appendChild(sinhvien);
            
            
            }
            const formSV = document.querySelector('#addSVform');
            formSV.reset();
            editID='';
            addSvBtn.innerText='Them Sinh Vien';

            localStorage.setItem('listSV', JSON.stringify(listSVInfo));
            return;
        }

    const newSV = {
        ID: 'MSV-' + currentCountSV,
        Email: inputEmail.value,
        Name: inputName.value,
        DOB: inputDOB.value,
        Course: inputCourse.value,
        Math: Number(inputMath.value),
        Physics: Number(inputPhysic.value),
        Chemistry: Number(inputChemistry.value),
    }
    listSVInfo.push(newSV);
    localStorage.setItem('listSV', JSON.stringify(listSVInfo));
    // them vao vi tri can thiet
    const newSVElement = buildSVTemplate(newSV);
    tableBodyElement.appendChild(newSVElement);
    const formSV = document.querySelector('#addSVform');
    formSV.reset();
    // tang MSV
    currentCountSV++;
    localStorage.setItem('msvCount', currentCountSV);
    document.querySelector('#txtMaSV').innerText = 'MSV-1' + currentCountSV;
}
