import { render, screen } from '@testing-library/react';
import { FaBeer } from 'react-icons/fa';

import { Slottable } from '@radix-ui/react-slot';
import { TESTS_IDS } from './button.constants';
import { Button } from './index';

describe('BUTTON (ATOMS)', () => {
  it('should render the content correctly', () => {
    render(
      <Button.Root>
        <Button.Icon icon={FaBeer} size="lg" />
        <Button.Content>Content Button</Button.Content>
      </Button.Root>
    );

    const contentElement = screen.getByTestId(TESTS_IDS.CONTENT);
    const iconElement = screen.getByTestId(TESTS_IDS.ICON);

    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent('Content Button');

    expect(iconElement).toBeInTheDocument();
  });

  it('should render the icon with the correct classnames', () => {
    const { container } = render(
      <Button.Root>
        <Button.Icon icon={FaBeer} size="lg" className="custom-class" />
      </Button.Root>
    );
    const contentElement = container.querySelector('svg');

    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveClass('custom-class');
  });

  it('should render the content with the correct classnames', () => {
    render(
      <Button.Root>
        <Button.Content className="custom-class">Content Button</Button.Content>
      </Button.Root>
    );
    const contentElement = screen.getByTestId(TESTS_IDS.CONTENT);

    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveClass('custom-class');
  });

  it('should render the content with the correct classnames', () => {
    render(
      <Button.Root asChild>
        <Slottable>
          <a href="/anchor">
            <Button.Icon icon={FaBeer} size="lg" />
            <Button.Content>Content Button</Button.Content>
          </a>
        </Slottable>
      </Button.Root>
    );

    const contentElement = screen.getByTestId(TESTS_IDS.CONTENT);
    const anchorElement = screen.getByTestId(TESTS_IDS.ROOT);

    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveTextContent('Content Button');
    expect(anchorElement).toHaveAttribute('href', '/anchor');

    expect(contentElement).toBeInTheDocument();
  });

  it('should fire a function on onClick when clicking the button', () => {
    const onClick = jest.fn();

    render(
      <Button.Root onClick={onClick}>
        <Button.Content>Content Button</Button.Content>
      </Button.Root>
    );

    const rootElement = screen.getByTestId(TESTS_IDS.ROOT);

    rootElement.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
