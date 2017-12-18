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


if (email_good && phone_number_good && name_good){


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


// before we submit the ajax request, we will create the details page
// with the information for the specific user we've created.
// the details page has a hidden element that displays the user id.
// The data received from the ajax request will be used to populate 
// the user id.

$("#new_form").css("display","none")
$("#contacts_table").css("display","none")
$("#contacts_table").css("display","none")
$("#details_page").css("display","inline")
$("#contact_name").html($('input[name=name]').val())
$("#contact_email").html($('input[name=email]').val())
$("#contact_phone_number").html($('input[name=phone_number]').val())
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
    })



// add table

$("#index").click(() => {$("#contacts_table").toggle()
$("#details_page").css("display","none")
$("#new_form").css("display","none")})

$("#new").click(() => {$("#new_form").toggle()
$("#details_page").css("display","none")
$("#contacts_table").css("display","none")
$('input[name=name]').val('')
$('input[name=email]').val('')
$('input[name=phone_number]').val('')
$('input[name=id]').val('')
})












})

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
        $line.append( $( "<td></td>" ).html("<span id=\"details"+user.id+"\">details</span>") )
        $line.append( $( "<td></td>" ).html("<span id=\"edit"+user.id+"\">edit</span>") )
        $line.append( $( "<td></td>" ).html("<span id=\"delete"+user.id+"\">delete</span>") )
        $table.append( $line )



// takes the user data we just created and displays the details page with the incorporated data.

if (user.name === $("#contact_name").html() && user.email === $("#contact_email").html() && user.phone_number === $("#contact_phone_number").html()){$("#contact_id").html(user.id)

$("#details_update").click(()=>{
$("#new_form").css("display","block")
$("#details_page").css("display","none")
$("#contacts_table").css("display","none")


})
$("#details_delete").click(()=>{


if (confirm("are you sure you want to do this?")){

const formData = {
            id: user.id,
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


})
}

}
    }

    $('#output').empty()
    $table.appendTo( $('#output') )


 for ( let index = 0; index < users.length; index++ ) {



        const user = users[index]
dummy_var = "#edit"+user.id
$(dummy_var).click(() => {$("#new_form").toggle()
$("#details_page").css("display","none")
$("#contacts_table").css("display","none")
$('input[name=name]').val(user.name)
$('input[name=email]').val(user.email)
$('input[name=phone_number]').val(user.phone_number)
$('input[name=id]').val(user.id)
})




// details

$("#details"+user.id).click(() =>
{

$('input[name=name]').val(user.name)
$('input[name=email]').val(user.email)
$('input[name=phone_number]').val(user.phone_number)
$('input[name=id]').val(user.id)




$("#new_form").css("display","none")
$("#contacts_table").css("display","none")
$("#contacts_table").css("display","none")
$("#details_page").css("display","inline")
$("#contact_name").html($('input[name=name]').val())
$("#contact_email").html($('input[name=email]').val())
$("#contact_phone_number").html($('input[name=phone_number]').val())

})


// delete

$("#delete"+user.id).click(()=>{

if (confirm("you sure you wanna do this?")){

const formData = {
            id: user.id,
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
    })




}


}

function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}





