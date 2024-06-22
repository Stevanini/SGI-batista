import { render, waitFor } from '@testing-library/react';
import { TESTS_IDS } from './number-animated.constants';
import { AnimatedNumbersRoot } from './numbers-animated.root';

describe('AnimatedNumbers (ATOMS)', () => {
  it('must render without function in params', async () => {
    const { getByTestId } = render(<AnimatedNumbersRoot from={0} to={100} />);

    const spanElement = getByTestId(TESTS_IDS.ROOT);
    expect(spanElement).toBeInTheDocument();

    await waitFor(
      () => {
        expect(spanElement).toHaveTextContent('0');
      },
      { timeout: 1000 }
    );

    expect(spanElement).toHaveTextContent('100');
  });

  it('must render and correctly cheer up', async () => {
    const { getByTestId } = render(<AnimatedNumbersRoot from={0} to={100} onFormat={(value) => value.toFixed()} />);

    const spanElement = getByTestId(TESTS_IDS.ROOT);
    expect(spanElement).toBeInTheDocument();

    await waitFor(
      () => {
        expect(spanElement).toHaveTextContent('0');
      },
      { timeout: 1000 }
    );

    expect(spanElement).toHaveTextContent('100');
  });
});
