// Basic philosophy of this app is:
// at anytime, only one user is in focus.
// this can be hidden, but the focus is
// logged on the new/update user form.
//
// The details page is populated from
// the form by the populate_details function.
// 
// This is performed when a new user is 
// created, or when the details button is clicked.
//
// The table of contacts is created dynamically
// everytime a new/update request gets sent to
// the backend.
//
// "Deleting" a user only changes the state on
// the backend to {id: ##, is_deleted: true}.
// 
// This helps keeps user ids unique.
//
// The front-end understands to ignore these records. 


$(document).ready(function () {
    $.ajax({
        type: 'GET', 
        url: 'api/user', 
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)

    // process the form
    $('#sendButtopn').click(() => {

// first check that this is valid data
if (validate_form()){

// if the submitted form is ok, then
// transition to the details page.
// and submit the form.
populate_details() 
show_details()
submit_form()

}
    })



$("#new").click(() =>{

clear_form()
show_form()

})

$("#index").click(()=>{
show_table()
})



$("#details_update").click(()=>{
show_form()

})
$("#details_delete").click(()=>{
	delete_user(get_user_id())
})










})


//////////////////////////////////////////////////////////////////////
// MYSTERIOUS FUNCTIONS
// //////////////////////////////////////////////////////////////////


function successHandler(users) {
    console.log(`Response has ${users.length} users`)
    var $table = $( "<table border='1' id='contacts_table'><tr><th id='shit'>ID</th><th>Name</th><th>Email</th><th>Phone</th><th></th><th></th><th></th></table>" );
    for ( let index = 0; index < users.length; index++ ) {
        const user = users[index]
console.log(user)
	if (user.deleted === ""){
        const $line = $( "<tr></tr>" )
        $line.append( $( "<td></td>" ).html( user.id ) )
        $line.append( $( "<td></td>" ).html( user.name ) )
        $line.append( $( "<td></td>" ).html( user.email ) )
        $line.append( $( "<td></td>" ).html( user.phone_number ) )
        $line.append( $( "<td></td>" ).html("<span class = \"button\" id=\"details"+user.id+"\">details</span>") )
        $line.append( $( "<td></td>" ).html("<span class=\"button\" id=\"edit"+user.id+"\">edit</span>") )
        $line.append( $( "<td></td>" ).html("<span class=\"button\" id=\"delete"+user.id+"\">delete</span>") )
        $table.append( $line )



// takes the user data we just created and displays the details page with the incorporated data.

if (user.name === $("#contact_name").html() && user.email === $("#contact_email").html() && user.phone_number === $("#contact_phone_number").html()){$("#contact_id").html(user.id)






}

}
    }

    $('#output').empty()
    $table.appendTo( $('#output') )


for ( let index = 0; index < users.length; index++ ) {



const user = users[index]
create_buttons(user)


}


}

function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}




function show_form(){
$("#new_form").css("display","inline")
$("#contacts_table").css("display","none")
$("#details_page").css("display","none")

}

function show_table(){
$("#new_form").css("display","none")
$("#contacts_table").css("display","inline")
$("#details_page").css("display","none")

}

function show_details(){
$("#new_form").css("display","none")
$("#contacts_table").css("display","none")
$("#details_page").css("display","inline")

}

function refresh_table(){
$("#new_form").css("display","inline")
$("#contacts_table").css("display","none")
$("#details_page").css("display","none")
}


function populate_form(user){
$('input[name=name]').val(user.name)
$('input[name=email]').val(user.email)
$('input[name=phone_number]').val(user.phone_number)
$('input[name=id]').val(user.id)
}

function populate_details(){
$("#contact_name").html($('input[name=name]').val())
$("#contact_email").html($('input[name=email]').val())
$("#contact_phone_number").html($('input[name=phone_number]').val())
}

function delete_user(userid){
if (confirm("you sure you wanna do this?")){

const formData = {
            id: userid,
            deleted: "true",
        }

        const requestData = JSON.stringify(formData)




        $.ajax({
                type: 'POST',
                url: 'api/user',
                data: requestData,
                dataType: 'json',
                contentType: 'application/json',
            })
            .done(successHandler)
            .fail(errorHandler)
}
    }


function validate_form(){


let okay_to_go = false
let email_good = false
let phone_number_good = false
let name_good = false
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('input[name=email]').val()))  
{

if ($('input[name=email]').val()!="")
{
email_good = true
}
}
else{
alert("bad email address")
}
if ($('input[name=name]').val()!="")
{
name_good = true
}
else {alert("enter your name")}


if (/^[2-9]{2}[0-9]{8}$/.test($('input[name=phone_number]').val()))
{
phone_number_good = true
}
else {alert("not a valid phone number")}

return (email_good && phone_number_good && name_good)
}


function submit_form(){

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        const formData = {
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
	    phone_number: $('input[name=phone_number]').val(),
	    id: $('input[name=id]').val(),
	    deleted: $('input[name=delete]').val(),
        }

        const requestData = JSON.stringify(formData)



       $.ajax({
                type: 'POST', 
                url: 'api/user', 
                data: requestData,
                dataType: 'json',
                contentType: 'application/json',
            })
            .done(successHandler)
            .fail(errorHandler)
}

function get_user_id(){
return $('input[name=id]').val()
}

function clear_form(){
$('input[name=name]').val('')
$('input[name=email]').val('')
$('input[name=phone_number]').val('')
$('input[name=id]').val('')
}


function create_buttons(user){


// create edit button
$("#edit"+user.id).click(() => {
	populate_form(user)
	show_form()
})




// details
$("#details"+user.id).click(() =>
{
	populate_form(user)
	show_details()
	populate_details()
})


// delete

$("#delete"+user.id).click(()=>{
	delete_user(user.id)
})

}
