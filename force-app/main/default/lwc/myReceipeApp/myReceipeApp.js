import { LightningElement, track } from 'lwc';
import getReceipeByIngredient from '@salesforce/apex/ReceipeWebService.getReceipeByIngredient';
import getRandomreceipe from '@salesforce/apex/ReceipeWebService.getRandomreceipe';

export default class MyReceipeApp extends LightningElement {
    @track searchReceipe = '';
    @track receipesByIngredients;
    @track error;

    handleReceipeValueChange(event) {
        this.searchReceipe = event.target.value;
    }

    handleReceipeByIngredientSearch() {
        getReceipeByIngredient({ ingredients: this.searchReceipe })
            .then(result => {
                this.receipesByIngredients = JSON.parse(result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.receipesByIngredients = undefined;
            });
    }

    fetchRandomReceipe() {
        getRandomreceipe()
            .then(result => {
                const data = JSON.parse(result);
                this.receipesByIngredients = data.recipes;
                alert(this.receipesByIngredients);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.receipesByIngredients = undefined;
            });
    }
}


// export default class MyReceipeApp extends LightningElement {
//     searchReceipe = '';
//     receipesByIngredients ;
//     error;

//     handleReceipeValueChange(event){
//         this.searchReceipe = event.target.value;
//     }


//     async handleReceipeByIngredientSearch() {
//         try{
//             this.receipesByIngredients = await getReceipeByIngredient({ingredients: this.searchReceipe})
//             alert(this.receipesByIngredients);
//         }catch (error){
//             this.error = error;
//             this.receipesByIngredients = undefined;
//         }
//     }

//     async fetchRandomReceipe()  {
//         try {
//             this.receipesByIngredients  = await getRandomreceipe();
//             alert(this.receipesByIngredients);
//             this.error = undefined;
//         } catch (error) {
//             this.receipesByIngredients  = undefined;
//             this.error = error;
//         }
//     }
// }
