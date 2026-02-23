import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup, RadioItem } from './Radio';

function TestGroup({
  value,
  onValueChange,
  disabled,
  error,
  orientation,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  disabled?: boolean;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      error={error}
      orientation={orientation}
      label="Pick one"
    >
      <RadioItem value="a">Option A</RadioItem>
      <RadioItem value="b">Option B</RadioItem>
      <RadioItem value="c">Option C</RadioItem>
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('renders the radio group with correct role', () => {
    render(<TestGroup />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all radio items', () => {
    render(<TestGroup />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('selects a radio item on click', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TestGroup onValueChange={onValueChange} />);

    await user.click(screen.getByLabelText('Option A'));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  it('reflects controlled value', () => {
    render(<TestGroup value="b" />);
    expect(screen.getByLabelText('Option B')).toBeChecked();
    expect(screen.getByLabelText('Option A')).not.toBeChecked();
  });

  it('works in uncontrolled mode with defaultValue', () => {
    render(
      <RadioGroup defaultValue="b" label="Pick one">
        <RadioItem value="a">A</RadioItem>
        <RadioItem value="b">B</RadioItem>
      </RadioGroup>,
    );
    expect(screen.getByLabelText('B')).toBeChecked();
    expect(screen.getByLabelText('A')).not.toBeChecked();
  });

  it('disables all items when group is disabled', () => {
    render(<TestGroup disabled />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((r) => expect(r).toBeDisabled());
  });

  it('disables individual item via RadioItem disabled prop', () => {
    render(
      <RadioGroup label="Pick one">
        <RadioItem value="a">A</RadioItem>
        <RadioItem value="b" disabled>
          B
        </RadioItem>
      </RadioGroup>,
    );
    expect(screen.getByLabelText('A')).not.toBeDisabled();
    expect(screen.getByLabelText('B')).toBeDisabled();
  });

  it('does not call onValueChange when disabled item is clicked', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TestGroup disabled onValueChange={onValueChange} />);

    await user.click(screen.getByLabelText('Option A'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('displays error message', () => {
    render(<TestGroup error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
    expect(screen.getByText('Please select an option')).toHaveClass('text-rose-400');
  });

  it('associates label with radiogroup via aria-labelledby', () => {
    render(<TestGroup />);
    const group = screen.getByRole('radiogroup');
    const labelId = group.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const labelEl = document.getElementById(labelId!);
    expect(labelEl).toBeInTheDocument();
    expect(labelEl?.textContent).toBe('Pick one');
  });

  it('associates error with radiogroup via aria-describedby', () => {
    render(<TestGroup error="Required" />);
    const group = screen.getByRole('radiogroup');
    const errorId = group.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    const errorEl = document.getElementById(errorId!);
    expect(errorEl?.textContent).toBe('Required');
  });

  it('navigates with ArrowDown key', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TestGroup value="a" onValueChange={onValueChange} />);

    const radioA = screen.getByLabelText('Option A');
    radioA.focus();
    await user.keyboard('{ArrowDown}');

    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('navigates with ArrowUp key and wraps around', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TestGroup value="a" onValueChange={onValueChange} />);

    const radioA = screen.getByLabelText('Option A');
    radioA.focus();
    await user.keyboard('{ArrowUp}');

    // Wraps from first to last
    expect(onValueChange).toHaveBeenCalledWith('c');
  });
});
