
                var form = document.querySelector("#main_form");
                var location = document.querySelector("#txtlocation");


                form.addEventListener("submit",(e)=>{
                    e.preventDefault();

                    console.log(location.value);
                })    
   