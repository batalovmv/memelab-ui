import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropZone } from './DropZone';

function makeFile(name = 'test.png', size = 1024, type = 'image/png') {
  return new File(['x'.repeat(size)], name, { type });
}

function makeDataTransfer(files: File[]) {
  return {
    files: Object.assign(files, {
      item: (i: number) => files[i],
      [Symbol.iterator]: Array.prototype[Symbol.iterator].bind(files),
    }) as unknown as FileList,
  } as DataTransfer;
}

describe('DropZone', () => {
  it('renders default content', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    expect(screen.getByText('Drop files here or click to browse')).toBeInTheDocument();
    // upload icon
    expect(document.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('renders custom children instead of default content', () => {
    render(
      <DropZone onFilesDropped={vi.fn()}>
        <p data-testid="custom">custom content</p>
      </DropZone>,
    );
    expect(screen.getByTestId('custom')).toBeInTheDocument();
    expect(screen.queryByText('Drop files here or click to browse')).not.toBeInTheDocument();
  });

  it('calls onFilesDropped with dropped files', () => {
    const onFilesDropped = vi.fn();
    render(<DropZone onFilesDropped={onFilesDropped} />);
    const zone = screen.getByRole('button');
    const file = makeFile();

    fireEvent.dragOver(zone);
    fireEvent.drop(zone, { dataTransfer: makeDataTransfer([file]) });

    expect(onFilesDropped).toHaveBeenCalledTimes(1);
    expect(onFilesDropped).toHaveBeenCalledWith([file]);
  });

  it('opens file dialog on click', async () => {
    const user = userEvent.setup();
    render(<DropZone onFilesDropped={vi.fn()} />);
    const zone = screen.getByRole('button');
    const input = zone.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    await user.click(zone);

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('does not open file dialog when disabled', async () => {
    const user = userEvent.setup();
    render(<DropZone onFilesDropped={vi.fn()} disabled />);
    const zone = screen.getByRole('button');
    const input = zone.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    await user.click(zone);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('does not call onFilesDropped when disabled and files are dropped', () => {
    const onFilesDropped = vi.fn();
    render(<DropZone onFilesDropped={onFilesDropped} disabled />);
    const zone = screen.getByRole('button');

    fireEvent.dragOver(zone);
    fireEvent.drop(zone, { dataTransfer: makeDataTransfer([makeFile()]) });

    expect(onFilesDropped).not.toHaveBeenCalled();
  });

  it('shows drag-over visual state on dragEnter', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    const zone = screen.getByRole('button');

    expect(zone).not.toHaveClass('border-primary');
    fireEvent.dragEnter(zone);
    expect(zone).toHaveClass('border-primary');
  });

  it('removes drag-over visual state on dragLeave', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    const zone = screen.getByRole('button');

    fireEvent.dragEnter(zone);
    expect(zone).toHaveClass('border-primary');

    fireEvent.dragLeave(zone);
    expect(zone).not.toHaveClass('border-primary');
  });

  it('removes drag-over visual state after drop', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    const zone = screen.getByRole('button');

    fireEvent.dragEnter(zone);
    fireEvent.drop(zone, { dataTransfer: makeDataTransfer([makeFile()]) });
    expect(zone).not.toHaveClass('border-primary');
  });

  it('activates file dialog on Enter key', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    const zone = screen.getByRole('button');
    const input = zone.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    fireEvent.keyDown(zone, { key: 'Enter' });

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('activates file dialog on Space key', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    const zone = screen.getByRole('button');
    const input = zone.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    fireEvent.keyDown(zone, { key: ' ' });

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('does not activate file dialog on other keys', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    const zone = screen.getByRole('button');
    const input = zone.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    fireEvent.keyDown(zone, { key: 'Tab' });

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('does not activate file dialog on keyboard when disabled', () => {
    render(<DropZone onFilesDropped={vi.fn()} disabled />);
    const zone = screen.getByRole('button');
    const input = zone.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    fireEvent.keyDown(zone, { key: 'Enter' });

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('has aria-label attribute', () => {
    render(<DropZone onFilesDropped={vi.fn()} aria-label="Upload images" />);
    expect(screen.getByRole('button', { name: 'Upload images' })).toBeInTheDocument();
  });

  it('uses default aria-label when none provided', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'File drop zone' })).toBeInTheDocument();
  });

  it('has aria-disabled when disabled', () => {
    render(<DropZone onFilesDropped={vi.fn()} disabled />);
    const zone = screen.getByRole('button');
    expect(zone).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not have aria-disabled when enabled', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    const zone = screen.getByRole('button');
    expect(zone).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('applies opacity-50 class when disabled', () => {
    render(<DropZone onFilesDropped={vi.fn()} disabled />);
    expect(screen.getByRole('button')).toHaveClass('opacity-50');
  });

  it('respects maxFiles by slicing file list', () => {
    const onFilesDropped = vi.fn();
    render(<DropZone onFilesDropped={onFilesDropped} maxFiles={2} />);
    const zone = screen.getByRole('button');
    const files = [makeFile('a.png'), makeFile('b.png'), makeFile('c.png')];

    fireEvent.drop(zone, { dataTransfer: makeDataTransfer(files) });

    const received: File[] = onFilesDropped.mock.calls[0][0];
    expect(received).toHaveLength(2);
  });

  it('respects maxSize by filtering oversized files', () => {
    const onFilesDropped = vi.fn();
    const maxSize = 500;
    render(<DropZone onFilesDropped={onFilesDropped} maxSize={maxSize} />);
    const zone = screen.getByRole('button');
    const small = makeFile('small.png', 100);
    const large = makeFile('large.png', 1000);

    fireEvent.drop(zone, { dataTransfer: makeDataTransfer([small, large]) });

    const received: File[] = onFilesDropped.mock.calls[0][0];
    expect(received).toHaveLength(1);
    expect(received[0].name).toBe('small.png');
  });

  it('applies custom className', () => {
    render(<DropZone onFilesDropped={vi.fn()} className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('has tabIndex 0 when enabled', () => {
    render(<DropZone onFilesDropped={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });

  it('has tabIndex -1 when disabled', () => {
    render(<DropZone onFilesDropped={vi.fn()} disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
  });
});
