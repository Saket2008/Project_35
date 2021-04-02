class Food
{
    constructor()
    {
        this.foodStock = 0;
        this.lastfed;
        this.image = loadImage("images/Milk.png");
    }

    updateFoodStock(foodStock)
    {
        this.foodStock = foodStock       
    }

    getFeedTime(lastFed)
    {
        this.lastfed = lastFed
    }

    deductFood()
    {
        if(this.foodStock > 0)
        {
            this.foodStock = this.foodStock - 1;
        }
    }

    getFoodStock(){
        return this.foodStock
    }

    display()
    {
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        //image(this.image, 720, 220, 70, 70)

        if (this.foodStock !== 0)
        {
            for(var m = 0; m < this.foodStock; m++)
            {
                if(m % 10 === 0)
                {
                    x = 80;
                    y = y + 50;
                }

                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}