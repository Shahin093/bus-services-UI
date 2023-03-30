import React from 'react';

const ReviewPage = ({ review }) => {
    return (

        <div className='bg-white slider-container p-10'>
            {review?.description}

            <div className="rating rating-lg rating-half">
                <input type="radio" name="rating-10" className="rating-hidden" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" defaultChecked />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
            </div>

            <div className='flex items-center justify-around mt-5'>
                <div className="avatar">
                    <div className="w-20  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={review?.image} alt='pic' />
                    </div>

                </div>
                <div>
                    <h2 className='font-bold'>Fred Rodriquez</h2>
                    <p>Project manager</p>
                </div>
            </div>
        </div>

    );
};

export default ReviewPage;