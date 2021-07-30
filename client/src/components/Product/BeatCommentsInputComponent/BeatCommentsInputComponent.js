import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import './BeatCommentsInputComponent.css';

const BeatCommentsInputComponent = ({t,action, product, STORE_USER}) =>{

      //USER IDENTIFICATION FOR REDUCER #############################################
        let userStore =
        STORE_USER.user && STORE_USER.user.data && STORE_USER.user.data.user
            ? STORE_USER.user.data.user
            : null;
        let user = {
        userStatus: userStore ? true : false,
        id: userStore && userStore.id ? userStore.id : 0,
        name: userStore && userStore.name ? userStore.name : "anon",
        orderId: STORE_USER.cartDetaills.id ? STORE_USER.cartDetaills.id : 0,
        };
     //#############################################################################

    const [comment, setComment] = useState();
    const [visibleInput, setVisibleInput] = useState(true)

    const handleKeyPress = (event) => {
        console.log("User en comment", userStore)
        let obj = {
            author: user.name,
            text: comment,
            userId: user.id,
        }
        if(event.key === 'Enter'){
            setVisibleInput(false)
            return action(product, obj)
        }
      }

    return (
        <div className="--BeatCommentsInputComponent-div">
            {visibleInput 
                ?(
                    <div className="--BeatCommentsInputComponent-div">
                    {user && user.id
                        ?(
                            <input
                            onChange={(e)=> setComment(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e)}
                            type="text" 
                            className="--BeatCommentsInputComponent-input"
                            placeholder="Add your comment..."
                            >
               
                           </input>
                        ):(
                            <p className="--BeatCommentsInputComponent-div-comment-added">
                                {t('components.beatComponentInput.commentAdd')}
                            </p>
                        )

                    }
                    </div>
                ):(
                    <p className="--BeatCommentsInputComponent-div-comment-added">
                        Thanks for your comment
                    </p>
                )
            }
        </div>
        
    )
}

export default withTranslation()(BeatCommentsInputComponent);