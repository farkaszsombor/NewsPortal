import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const errorBox = ({error}) => {

    let errorDiv = null;
    if(error !== null) {
        errorDiv = <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
    }

    return <Auxiliary>
        {errorDiv}
    </Auxiliary>
};

export default errorBox;