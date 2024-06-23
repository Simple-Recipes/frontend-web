import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import tagService from '../services/tagService';
import TagsList from '../pages/Profile/components/TagsList';

jest.mock('../services/tagService', () => ({
  getAllTags: jest.fn(),
  addTag: jest.fn(),
  deleteTag: jest.fn(),
}));

const mockTags = [
  { id: 1, name: 'Breakfast' },
  { id: 2, name: 'Easy' },
];

describe('TagsList component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches and displays tags', async () => {
    (tagService.getAllTags as jest.Mock).mockResolvedValue(mockTags);

    render(<TagsList />);

    expect(screen.getByText('Tags')).toBeInTheDocument();

    // 等待标签被获取并显示
    expect(await screen.findByText('Breakfast')).toBeInTheDocument();
    expect(await screen.findByText('Easy')).toBeInTheDocument();
  });

  it('allows adding a new tag', async () => {
    (tagService.getAllTags as jest.Mock).mockResolvedValue(mockTags);
    const newTag = { id: 3, name: 'Lunch' };
    (tagService.addTag as jest.Mock).mockResolvedValue(newTag);

    render(<TagsList />);

    fireEvent.change(screen.getByPlaceholderText('New tag name...'), {
      target: { value: 'Lunch' },
    });

    fireEvent.click(screen.getByText('Add Tag'));

    expect(await screen.findByText('Lunch')).toBeInTheDocument();
  });

  it('allows deleting a tag', async () => {
    (tagService.getAllTags as jest.Mock).mockResolvedValue(mockTags);

    render(<TagsList />);

    fireEvent.click(await screen.findByTestId('delete-button-1'));

    expect(tagService.deleteTag).toHaveBeenCalledWith(1);
  });
});
