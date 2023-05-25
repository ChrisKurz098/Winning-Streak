import App from '../../App';
import {render, screen, cleanup} from '@testing-library/react';


test('Should render WeekView ', () => {
    render(<App/>);
    const WeekViewElement = screen.getByTestId('WeekViewId');

    expect(WeekViewElement).toBeInTheDocument();
});