// Components
import ProviderWrapper from './ProviderWrapper';
// Styles
import '../styles/globals.css';

const RootLayout = ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang='en'>
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
