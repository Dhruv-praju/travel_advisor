import React,{forwardRef} from "react";
import {Box, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions, Button} from '@mui/material'
import './review.css'

const PlaceDetails = ({ place, selected, refProp})=>{

    if(selected) {
        console.log('PLACE U SELECTED IS: ');
        console.log(place);
        refProp?.current?.scrollIntoView({behaviour: 'smooth', block:'start'})
    }
    return (
            <Card sx={{display:'flex'}}>
                <CardMedia
                    component='img'
                    height='auto'
                    sx={{width:140}}
                    image={place.photo?.images.small.url}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardActionArea onClick={()=>window.open(place.web_url, '_blank')}>

                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="h5" component='div' fontWeight='medium'>
                                {place.name}
                            </Typography>
                            
                            <Box display='flex' alignItems='center'>
                                <Review num={Number(place.rating)}/>

                                <Typography variant='body1' component='div' pl={1}>
                                    {place.num_reviews} reviews
                                </Typography>
                            </Box>

                            <Typography variant="subtitle2" component='div'>
                                {`Ranked ${place.ranking}`}
                            </Typography>

                            <Typography variant="subtitle1" component='div'>

                                {place?.cuisine?.map(c =>{
                                    const diet = place.dietary_restrictions
                                    if(!diet.filter(o => o.key===c.key).length) return c.name
                                }).filter(Boolean).join(', ')}
                                
                            </Typography>

                        </CardContent>

                    </CardActionArea>
                </Box>
            </Card>
    )
}

const Review = ({num})=>{
  
    return (
      <React.Fragment>
        <ul className='circles'>

        {Array(5).fill().map((_,i) =>{
          let wNum = Math.floor(num)
          if(wNum >= i+1) return  <li key={i} className='circle full'></li>
          else if(i<Math.ceil(num)) return <li key={i} className="circle half"></li>
          else return <li key={i} className="circle"></li>
        })
        }
        
      </ul>
      </React.Fragment>
    )
}
export default PlaceDetails 