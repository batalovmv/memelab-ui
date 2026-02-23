import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tab, TabList, TabPanel, Tabs } from './Tabs';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function BasicTabs({ defaultValue = 'tab1', variant }: { defaultValue?: string; variant?: 'underline' | 'pill' }) {
  return (
    <Tabs defaultValue={defaultValue} variant={variant}>
      <TabList>
        <Tab value="tab1">First</Tab>
        <Tab value="tab2">Second</Tab>
        <Tab value="tab3">Third</Tab>
      </TabList>
      <TabPanel value="tab1">Panel One</TabPanel>
      <TabPanel value="tab2">Panel Two</TabPanel>
      <TabPanel value="tab3">Panel Three</TabPanel>
    </Tabs>
  );
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Tabs', () => {
  // renders
  it('renders all tabs', () => {
    render(<BasicTabs />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('renders the active panel', () => {
    render(<BasicTabs defaultValue="tab1" />);
    expect(screen.getByText('Panel One')).toBeInTheDocument();
  });

  it('only renders the active panel', () => {
    render(<BasicTabs defaultValue="tab1" />);
    expect(screen.queryByText('Panel Two')).not.toBeInTheDocument();
    expect(screen.queryByText('Panel Three')).not.toBeInTheDocument();
  });

  // click
  it('switches panel on tab click', async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);

    await user.click(screen.getByText('Second'));
    expect(screen.getByText('Panel Two')).toBeInTheDocument();
    expect(screen.queryByText('Panel One')).not.toBeInTheDocument();
  });

  // uncontrolled
  it('uses defaultValue for initial active tab', () => {
    render(<BasicTabs defaultValue="tab2" />);
    expect(screen.getByText('Panel Two')).toBeInTheDocument();
    expect(screen.queryByText('Panel One')).not.toBeInTheDocument();
  });

  // controlled
  it('controlled mode — renders value panel', () => {
    render(
      <Tabs value="tab2">
        <TabList>
          <Tab value="tab1">First</Tab>
          <Tab value="tab2">Second</Tab>
        </TabList>
        <TabPanel value="tab1">Panel One</TabPanel>
        <TabPanel value="tab2">Panel Two</TabPanel>
      </Tabs>,
    );
    expect(screen.getByText('Panel Two')).toBeInTheDocument();
    expect(screen.queryByText('Panel One')).not.toBeInTheDocument();
  });

  it('controlled mode — calls onValueChange on tab click', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Tabs value="tab1" onValueChange={onValueChange}>
        <TabList>
          <Tab value="tab1">First</Tab>
          <Tab value="tab2">Second</Tab>
        </TabList>
        <TabPanel value="tab1">Panel One</TabPanel>
        <TabPanel value="tab2">Panel Two</TabPanel>
      </Tabs>,
    );

    await user.click(screen.getByText('Second'));
    expect(onValueChange).toHaveBeenCalledWith('tab2');
  });

  // disabled
  it('disabled tab cannot be selected', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">First</Tab>
          <Tab value="tab2" disabled>
            Disabled
          </Tab>
        </TabList>
        <TabPanel value="tab1">Panel One</TabPanel>
        <TabPanel value="tab2">Panel Two</TabPanel>
      </Tabs>,
    );

    await user.click(screen.getByText('Disabled'));
    expect(screen.getByText('Panel One')).toBeInTheDocument();
    expect(screen.queryByText('Panel Two')).not.toBeInTheDocument();
  });

  it('disabled tab has disabled attribute', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">First</Tab>
          <Tab value="tab2" disabled>
            Disabled
          </Tab>
        </TabList>
        <TabPanel value="tab1">Panel One</TabPanel>
      </Tabs>,
    );
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  // ARIA
  it('tablist has role="tablist"', () => {
    render(<BasicTabs />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('tabs have role="tab"', () => {
    render(<BasicTabs />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('active tab has aria-selected="true"', () => {
    render(<BasicTabs defaultValue="tab1" />);
    expect(screen.getByText('First').closest('[role="tab"]')).toHaveAttribute('aria-selected', 'true');
  });

  it('inactive tabs have aria-selected="false"', () => {
    render(<BasicTabs defaultValue="tab1" />);
    expect(screen.getByText('Second').closest('[role="tab"]')).toHaveAttribute('aria-selected', 'false');
  });

  it('panel has role="tabpanel"', () => {
    render(<BasicTabs />);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('tab aria-controls matches panel id', () => {
    render(<BasicTabs defaultValue="tab1" />);
    const tab = screen.getByText('First').closest('[role="tab"]') as HTMLElement;
    const panel = screen.getByRole('tabpanel');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
  });

  it('panel aria-labelledby matches tab id', () => {
    render(<BasicTabs defaultValue="tab1" />);
    const tab = screen.getByText('First').closest('[role="tab"]') as HTMLElement;
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  // keyboard navigation
  it('ArrowRight moves focus to next tab and activates it', async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="tab1" />);

    screen.getByText('First').focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByText('Panel Two')).toBeInTheDocument();
  });

  it('ArrowLeft moves focus to previous tab and activates it', async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="tab2" />);

    screen.getByText('Second').focus();
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByText('Panel One')).toBeInTheDocument();
  });

  it('ArrowRight wraps from last to first', async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="tab3" />);

    screen.getByText('Third').focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByText('Panel One')).toBeInTheDocument();
  });

  it('ArrowLeft wraps from first to last', async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="tab1" />);

    screen.getByText('First').focus();
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByText('Panel Three')).toBeInTheDocument();
  });

  it('Home moves to first tab', async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="tab3" />);

    screen.getByText('Third').focus();
    await user.keyboard('{Home}');

    expect(screen.getByText('Panel One')).toBeInTheDocument();
  });

  it('End moves to last tab', async () => {
    const user = userEvent.setup();
    render(<BasicTabs defaultValue="tab1" />);

    screen.getByText('First').focus();
    await user.keyboard('{End}');

    expect(screen.getByText('Panel Three')).toBeInTheDocument();
  });

  // variants
  it('underline variant applies border-b-2 to active tab', () => {
    render(<BasicTabs variant="underline" />);
    const activeTab = screen.getByText('First').closest('[role="tab"]') as HTMLElement;
    expect(activeTab).toHaveClass('border-b-2');
  });

  it('pill variant applies rounded-lg to active tab', () => {
    render(<BasicTabs variant="pill" />);
    const activeTab = screen.getByText('First').closest('[role="tab"]') as HTMLElement;
    expect(activeTab).toHaveClass('rounded-lg');
  });

  it('pill variant applies bg-white/10 to active tab', () => {
    render(<BasicTabs variant="pill" />);
    const activeTab = screen.getByText('First').closest('[role="tab"]') as HTMLElement;
    expect(activeTab).toHaveClass('bg-white/10');
  });
});
