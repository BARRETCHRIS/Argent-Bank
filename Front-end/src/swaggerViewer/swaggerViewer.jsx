import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerViewer = () => {
  return (
    <div style={{ padding: '20px', textAlign:'left' }}>
      <SwaggerUI url="/swagger.yaml" />
    </div>
  );
};

export default SwaggerViewer;