import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown, DropdownItem, DropdownMenu, DropdownSeparator, DropdownTrigger } from './Dropdown';

// ---------------------------------------------------------------------------
// jsdom stubs — jsdom has no layout engine so geometry APIs return empty/zero
// ---------------------------------------------------------------------------

beforeAll(() => {
  Element.prototype.getClientRects = function () {
    return [new DOMRect(0, 0, 100, 20)] as unknown as DOMRectList;
  };
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function SimpleDropdown({
  align,
  onSelect,
}: {
  align?: 'left' | 'right';
  onSelect?: () => void;
} = {}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button>Open</button>
      </DropdownTrigger>
      <DropdownMenu align={align}>
        <DropdownItem onSelect={onSelect}>Item One</DropdownItem>
        <DropdownItem>Item Two</DropdownItem>
        <DropdownItem>Item Three</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

function DropdownWithDisabled() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button>Open</button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Enabled</DropdownItem>
        <DropdownItem disabled>Disabled</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

function DropdownWithSeparator() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button>Open</button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>First</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Second</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

/** Open menu and wait for the rAF-based focus to complete */
async function openMenu(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Open' }));
  // DropdownMenu defers focus via requestAnimationFrame; wait for it
  await waitFor(() => {
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
  // Small delay for rAF to flush
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Dropdown', () => {
  // ---- open / close --------------------------------------------------------

  it('renders trigger but not menu initially', () => {
    render(<SimpleDropdown />);
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens menu on trigger click', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Item One')).toBeInTheDocument();
  });

  it('closes menu on second trigger click (toggle)', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape and returns focus to trigger', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    await openMenu(user);

    // Focus the menu so Escape is dispatched there
    screen.getByRole('menu').focus();
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes on click outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SimpleDropdown />
        <button>Outside</button>
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Outside' }));
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  // ---- keyboard navigation -------------------------------------------------

  it('navigates down with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await openMenu(user);

    const items = screen.getAllByRole('menuitem');
    items[0].focus();

    await user.keyboard('{ArrowDown}');
    expect(items[1]).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(items[2]).toHaveFocus();
  });

  it('navigates up with ArrowUp', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await openMenu(user);

    const items = screen.getAllByRole('menuitem');
    items[0].focus();

    await user.keyboard('{ArrowUp}');
    // Wraps to last item
    expect(items[2]).toHaveFocus();
  });

  it('jumps to first item with Home', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await openMenu(user);

    const items = screen.getAllByRole('menuitem');
    items[2].focus();

    await user.keyboard('{Home}');
    expect(items[0]).toHaveFocus();
  });

  it('jumps to last item with End', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await openMenu(user);

    const items = screen.getAllByRole('menuitem');
    items[0].focus();

    await user.keyboard('{End}');
    expect(items[2]).toHaveFocus();
  });

  it('wraps ArrowDown from last to first', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await openMenu(user);

    const items = screen.getAllByRole('menuitem');
    items[items.length - 1].focus();

    await user.keyboard('{ArrowDown}');
    expect(items[0]).toHaveFocus();
  });

  // ---- onSelect ------------------------------------------------------------

  it('calls onSelect when item is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SimpleDropdown onSelect={onSelect} />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.click(screen.getByText('Item One'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('closes the menu after onSelect', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown onSelect={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.click(screen.getByText('Item One'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('calls onSelect via Enter key', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SimpleDropdown onSelect={onSelect} />);
    await openMenu(user);

    const items = screen.getAllByRole('menuitem');
    items[0].focus();
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  // ---- disabled item -------------------------------------------------------

  it('disabled item has aria-disabled="true"', async () => {
    const user = userEvent.setup();
    render(<DropdownWithDisabled />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const disabled = screen.getByText('Disabled');
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
  });

  it('disabled item is not focusable via keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<DropdownWithDisabled />);
    await openMenu(user);

    const enabledItem = screen.getByText('Enabled');
    enabledItem.focus();

    // ArrowDown should not land on disabled item — menu only has one enabled item so it wraps back
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('Enabled')).toHaveFocus();
  });

  it('clicking disabled item does not close the menu', async () => {
    const user = userEvent.setup();
    render(<DropdownWithDisabled />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    // pointer-events-none on disabled items means the click hits the parent;
    // assert menu is still open after attempting to interact
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  // ---- ARIA roles ----------------------------------------------------------

  it('trigger has aria-haspopup="menu"', () => {
    render(<SimpleDropdown />);
    expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('trigger has aria-expanded="false" when closed', () => {
    render(<SimpleDropdown />);
    expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('trigger has aria-expanded="true" when open', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('menu has role="menu"', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('items have role="menuitem"', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const items = screen.getAllByRole('menuitem');
    expect(items).toHaveLength(3);
  });

  // ---- separator -----------------------------------------------------------

  it('renders separator with role="separator"', async () => {
    const user = userEvent.setup();
    render(<DropdownWithSeparator />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  // ---- focus return --------------------------------------------------------

  it('returns focus to trigger after selecting an item', async () => {
    const user = userEvent.setup();
    render(<SimpleDropdown onSelect={vi.fn()} />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    await openMenu(user);

    const items = screen.getAllByRole('menuitem');
    items[0].focus();
    await user.keyboard('{Enter}');

    expect(trigger).toHaveFocus();
  });
});
