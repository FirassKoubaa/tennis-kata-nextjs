import { render, screen, fireEvent } from '@testing-library/react';
import TennisGameComponent from './TennisGameComponent';

describe('TennisGameComponent', () => {
  it('affiche le titre et les boutons', () => {
    render(<TennisGameComponent />);
    expect(screen.getByText('Tennis Kata Testeur')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Envoyer')).toBeInTheDocument();
  });

  it('ajoute les lettres A et B à la séquence', () => {
    render(<TennisGameComponent />);
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('B'));
    expect(screen.getByText('Séquence :')).toBeInTheDocument();
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('reset la séquence', () => {
    render(<TennisGameComponent />);
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('Séquence :')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});

